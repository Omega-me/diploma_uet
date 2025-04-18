import { onGenerateSmartAiMessage } from '@/actions/webhook';
import {
  createChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponses,
} from '@/actions/webhook/queries';
import { sendDM } from '@/lib/fetch';
import { client } from '@/lib/prisma.lib';
import { Keyword } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { send } from 'process';

// Required by Instagram to validate the webhook and its needed on the first request, after the validation for the instagram it wont be needed anymore
export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get('hub.challenge');
  return new NextResponse(hub);
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json();
  let matcher: Keyword | null;

  try {
    // verify if the keyword that was commented or sent as dm is inside the message

    // this is for the dm
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text,
      );
    }

    // this is for the comments
    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text,
      );
    }

    // check if matcher exists and has the automation id
    if (matcher && matcher.automationId) {
      // we have a keyword match
      // Get the details of the automation

      // this is for the dm
      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true,
        );

        // start the automation
        if (automation && automation.triggers) {
          // send a dm to the user
          if (
            automation.listener &&
            automation.listener.listener === 'MESSAGE'
          ) {
            const direct_message = await sendDM(
              webhook_payload.entry[0].id, // userId
              webhook_payload.entry[0].messaging[0].sender.id, // recieverId
              automation?.listener?.prompt, // prompt
              automation?.User?.integrations[0].token, // token
            );

            // if the message was sent successfully
            if (direct_message.status === 200) {
              // tracking the first response
              const tracked = await trackResponses(automation.id, 'DM');

              if (tracked) {
                return NextResponse.json(
                  {
                    message: 'Message sent',
                  },
                  {
                    status: 200,
                  },
                );
              }
            }
          }

          // use AI to sent responses
          if (
            automation.listener &&
            automation.listener.listener === 'SMARTAI' &&
            automation.User?.subscription?.plan === 'PRO'
          ) {
            // generate response using AI
            const smart_ai_message = await onGenerateSmartAiMessage(
              automation.listener?.prompt,
              [],
            );

            if (smart_ai_message) {
              // save chat history

              //   create reciever chat
              const reciever = createChatHistory(
                automation.id, // automationId
                webhook_payload.entry[0].id, // senderId
                webhook_payload.entry[0].messaging[0].sender.id, // reciever
                webhook_payload.entry[0].messaging[0].message.text, // message
              );

              //   create sender chat
              const sender = createChatHistory(
                automation.id, // automationId
                webhook_payload.entry[0].id, // senderId
                webhook_payload.entry[0].messaging[0].sender.id, // reciever
                smart_ai_message, // message
              );

              await client.$transaction([reciever, sender]);

              const direct_message = await sendDM(
                webhook_payload.entry[0].id, // userId
                webhook_payload.entry[0].messaging[0].sender.id, // recieverId
                smart_ai_message, // prompt
                automation.User?.integrations[0].token, // token
              );

              if (direct_message) {
                const tracked = await trackResponses(automation.id, 'DM');

                if (tracked) {
                  return NextResponse.json(
                    {
                      message: 'Message sent',
                    },
                    {
                      status: 200,
                    },
                  );
                }
              }
            }
          }
        }
      }

      // this is for the comments
      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === 'comments'
      ) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true,
        );

        const automations_posts = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id!,
        );

        if (automation && automations_posts && automation.triggers) {
          if (automation.listener) {
            if (automation.listener.listener === 'MESSAGE') {
              const direct_message = await sendDM(
                webhook_payload.entry[0].id, // userId
                webhook_payload.entry[0].changes[0].value.from.id, // recieverId
                automation?.listener?.prompt, // prompt
                automation?.User?.integrations[0].token!, // token
              );

              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, 'COMMENT');

                if (tracked) {
                  return NextResponse.json(
                    {
                      message: 'Message sent',
                    },
                    {
                      status: 200,
                    },
                  );
                }
              }
            }

            if (
              automation.listener.listener === 'SMARTAI' &&
              automation.User?.subscription?.plan === 'PRO'
            ) {
              // generate response using AI
              const smart_ai_message = await onGenerateSmartAiMessage(
                automation.listener?.prompt,
                [],
              );

              if (smart_ai_message) {
                // TODO: working here, 8:50 min on video, controll the code writed here in this if block because itas generated by coopilot and it may not be correct
                // save chat history

                //   create reciever chat
                const reciever = createChatHistory(
                  automation.id, // automationId
                  webhook_payload.entry[0].id, // senderId
                  webhook_payload.entry[0].changes[0].value.from.id, // reciever
                  webhook_payload.entry[0].changes[0].value.text, // message
                );

                //   create sender chat
                const sender = createChatHistory(
                  automation.id, // automationId
                  webhook_payload.entry[0].id, // senderId
                  webhook_payload.entry[0].changes[0].value.from.id, // reciever
                  smart_ai_message, // message
                );

                await client.$transaction([reciever, sender]);

                const direct_message = await sendDM(
                  webhook_payload.entry[0].id, // userId
                  webhook_payload.entry[0].changes[0].value.from.id, // recieverId
                  smart_ai_message, // prompt
                  automation.User?.integrations[0].token!, // token
                );

                if (direct_message) {
                  const tracked = await trackResponses(
                    automation.id,
                    'COMMENT',
                  );

                  if (tracked) {
                    return NextResponse.json(
                      {
                        message: 'Message sent',
                      },
                      {
                        status: 200,
                      },
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {}
}

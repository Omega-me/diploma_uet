import { onGetAllAutomations, onGetAutomationInfo } from '@/actions/automation';
import { useQuery } from '@tanstack/react-query';

export const useQueryAutomations = () => {
  return useQuery({
    queryKey: ['user-automations'],
    queryFn: onGetAllAutomations,
  });
};

export const useQueryAutomation = (id: string) => {
  return useQuery({
    queryKey: ['automation-info'],
    queryFn: () => onGetAutomationInfo(id),
  });
};

import { useSubmitLead } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export function useLeadSubmission() {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  return useSubmitLead({
    mutation: {
      onSuccess: () => {
        toast({
          title: t("leadForm.toastSuccessTitle"),
          description: t("leadForm.toastSuccessDesc"),
          variant: "default",
        });
      },
      onError: (error) => {
        toast({
          title: t("leadForm.toastErrorTitle"),
          description: error.error?.error || t("leadForm.toastErrorDesc"),
          variant: "destructive",
        });
      }
    }
  });
}

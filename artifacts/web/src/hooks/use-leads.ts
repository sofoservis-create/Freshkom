import { useSubmitLead } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export function useLeadSubmission() {
  const { toast } = useToast();
  
  return useSubmitLead({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Úspešne odoslané!",
          description: "Ďakujeme za váš dopyt. Čoskoro sa vám ozveme s cenovou ponukou.",
          variant: "default",
        });
      },
      onError: (error) => {
        toast({
          title: "Chyba pri odosielaní",
          description: error.error?.error || "Nepodarilo sa odoslať formulár. Skúste to prosím znova, alebo nám zavolajte.",
          variant: "destructive",
        });
      }
    }
  });
}

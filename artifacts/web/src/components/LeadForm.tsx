import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeadSubmission } from "@/hooks/use-leads";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceIds = [
  "tepovanie-gaucov",
  "tepovanie-kobercov",
  "tepovanie-matracov",
  "tepovanie-aut",
  "cistenie-caluneneho-nabytku",
  "umyvanie-okien",
  "hlbkove-cistenie",
  "ine"
] as const;

type LeadFormValues = {
  name: string;
  phone: string;
  email: string;
  service: (typeof serviceIds)[number];
  message?: string;
};

export default function LeadForm({ defaultService }: { defaultService?: string }) {
  const { mutate: submitLead, isPending } = useLeadSubmission();
  const { t } = useLanguage();

  const leadSchema = z.object({
    name: z.string().min(2, t("leadForm.validationName")),
    phone: z.string().min(9, t("leadForm.validationPhone")),
    email: z.string().email(t("leadForm.validationEmail")),
    service: z.enum(serviceIds, {
      required_error: t("leadForm.validationService"),
    }),
    message: z.string().optional(),
  });

  const services = [
    { id: "tepovanie-gaucov", title: t("leadForm.serviceCouches") },
    { id: "tepovanie-kobercov", title: t("leadForm.serviceCarpets") },
    { id: "tepovanie-matracov", title: t("leadForm.serviceMattresses") },
    { id: "tepovanie-aut", title: t("leadForm.serviceCars") },
    { id: "cistenie-caluneneho-nabytku", title: t("leadForm.serviceUpholstery") },
    { id: "umyvanie-okien", title: t("leadForm.serviceWindows") },
    { id: "hlbkove-cistenie", title: t("leadForm.serviceDeepClean") },
  ];

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: defaultService as LeadFormValues["service"] | undefined,
      message: "",
    },
  });

  const onSubmit = (data: LeadFormValues) => {
    submitLead({ data }, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <Card className="bg-white text-foreground rounded-3xl shadow-2xl p-2 sm:p-4">
      <CardContent className="p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{t("leadForm.name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("leadForm.namePlaceholder")} className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{t("leadForm.phone")} <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder={t("leadForm.phonePlaceholder")} className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{t("leadForm.email")} <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder={t("leadForm.emailPlaceholder")} type="email" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{t("leadForm.serviceType")} <span className="text-destructive">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white">
                          <SelectValue placeholder={t("leadForm.selectService")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map(s => (
                          <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                        ))}
                        <SelectItem value="ine">{t("leadForm.serviceOther")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">{t("leadForm.message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("leadForm.messagePlaceholder")}
                      className="resize-none min-h-[120px] rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="xl"
              className="w-full h-16 text-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-bold group"
              disabled={isPending}
            >
              {isPending ? t("leadForm.submitting") : (
                <>
                  {t("leadForm.submit")}
                  <CheckCircle2 className="ml-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                </>
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              {t("leadForm.disclaimer")}
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

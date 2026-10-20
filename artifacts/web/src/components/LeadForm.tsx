import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { localizePath } from "@/seo/routes";
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
  "cistenie-koze",
  "umyvanie-okien",
  "cistenie-radiatorov",
  "ine"
] as const;

type LeadFormValues = {
  name: string;
  phone: string;
  email: string;
  service: (typeof serviceIds)[number];
  message?: string;
  privacyAcknowledged: boolean;
  marketingConsent: boolean;
};

export default function LeadForm({ defaultService }: { defaultService?: string }) {
  const { mutate: submitLead, isPending } = useLeadSubmission();
  const { t, lang } = useLanguage();

  const leadSchema = z.object({
    name: z.string().min(2, t("leadForm.validationName")),
    phone: z.string().min(9, t("leadForm.validationPhone")),
    email: z.string().email(t("leadForm.validationEmail")),
    service: z.enum(serviceIds, {
      required_error: t("leadForm.validationService"),
    }),
    message: z.string().optional(),
    privacyAcknowledged: z.boolean().refine((value) => value, t("leadForm.validationPrivacy")),
    marketingConsent: z.boolean(),
  });

  const services = [
    { id: "tepovanie-gaucov", title: t("leadForm.serviceCouches") },
    { id: "tepovanie-kobercov", title: t("leadForm.serviceCarpets") },
    { id: "tepovanie-matracov", title: t("leadForm.serviceMattresses") },
    { id: "tepovanie-aut", title: t("leadForm.serviceCars") },
    { id: "cistenie-caluneneho-nabytku", title: t("leadForm.serviceUpholstery") },
    { id: "cistenie-koze", title: t("leadForm.serviceLeather") },
    { id: "umyvanie-okien", title: t("leadForm.serviceWindows") },
    { id: "cistenie-radiatorov", title: t("leadForm.serviceRadiators") },
  ];

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: defaultService as LeadFormValues["service"] | undefined,
      message: "",
      privacyAcknowledged: false,
      marketingConsent: false,
    },
  });

  const onSubmit = (data: LeadFormValues) => {
    if (!data.privacyAcknowledged) return;
    submitLead({ data: { ...data, privacyAcknowledged: true, consentLanguage: lang } }, {
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
                    <FormLabel className="text-base">{t("leadForm.name")} <span className="text-destructive">*</span></FormLabel>
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
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
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
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <FormField
                control={form.control}
                name="privacyAcknowledged"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} aria-required="true" className="mt-1 shrink-0" />
                      </FormControl>
                      <div className="min-w-0">
                        <FormLabel className="block cursor-pointer text-sm font-normal leading-relaxed text-gray-700">
                          {t("leadForm.privacyPrefix")}
                          <a href={localizePath("/ochrana-osobnych-udajov", lang)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary focus-visible:outline focus-visible:outline-2">
                            {t("leadForm.privacyPolicy")}
                          </a>
                          {t("leadForm.privacySuffix")}
                        </FormLabel>
                        <FormDescription className="mt-1 text-xs leading-relaxed text-gray-600">{t("leadForm.privacyHint")}</FormDescription>
                      </div>
                    </div>
                    <FormMessage className="pl-7 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketingConsent"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} className="mt-1 shrink-0" />
                      </FormControl>
                      <div className="min-w-0">
                        <FormLabel className="block cursor-pointer text-sm font-normal leading-relaxed text-gray-700">
                          {t("leadForm.marketingBeforeEmail")}
                          <a href="mailto:info@freshkom.sk" className="underline underline-offset-2 hover:text-primary">info@freshkom.sk</a>
                          {t("leadForm.marketingAfterEmail")}
                        </FormLabel>
                        <FormDescription className="mt-1 text-xs leading-relaxed text-gray-600">{t("leadForm.marketingHint")}</FormDescription>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <p className="text-xs leading-relaxed text-gray-600">
                {t("leadForm.customerMarketingBeforeEmail")}
                <a href="mailto:info@freshkom.sk" className="underline underline-offset-2 hover:text-primary">info@freshkom.sk</a>
                {t("leadForm.customerMarketingAfterEmail")}
              </p>
            </div>
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

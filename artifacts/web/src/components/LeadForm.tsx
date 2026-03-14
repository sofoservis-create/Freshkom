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

const services = [
  { id: "tepovanie-gaucov", title: "Tepovanie gaučov a sedačiek" },
  { id: "tepovanie-kobercov", title: "Tepovanie kobercov" },
  { id: "tepovanie-matracov", title: "Tepovanie matracov" },
  { id: "tepovanie-aut", title: "Tepovanie áut" },
  { id: "cistenie-caluneneho-nabytku", title: "Čistenie čalúneného nábytku" },
  { id: "umyvanie-okien", title: "Umývanie okien a výkladov" },
  { id: "hlbkove-cistenie", title: "Hĺbkové čistenie" },
];

const leadSchema = z.object({
  name: z.string().min(2, "Meno musí obsahovať aspoň 2 znaky"),
  phone: z.string().min(9, "Zadajte platné telefónne číslo"),
  email: z.string().email("Zadajte platný email").optional().or(z.literal("")),
  service: z.enum([
    "tepovanie-gaucov",
    "tepovanie-kobercov",
    "tepovanie-matracov",
    "tepovanie-aut",
    "cistenie-caluneneho-nabytku",
    "umyvanie-okien",
    "hlbkove-cistenie",
    "ine"
  ], {
    required_error: "Prosím, vyberte druh služby",
  }),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export default function LeadForm({ defaultService }: { defaultService?: string }) {
  const { mutate: submitLead, isPending } = useLeadSubmission();

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
                    <FormLabel className="text-base">Meno a priezvisko</FormLabel>
                    <FormControl>
                      <Input placeholder="Jozef Mak" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
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
                    <FormLabel className="text-base">Telefónne číslo <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="+421 9XX XXX XXX" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
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
                    <FormLabel className="text-base">Email (nepovinné)</FormLabel>
                    <FormControl>
                      <Input placeholder="jozef@email.sk" type="email" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white" {...field} />
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
                    <FormLabel className="text-base">Druh služby <span className="text-destructive">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white">
                          <SelectValue placeholder="Vyberte si službu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map(s => (
                          <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                        ))}
                        <SelectItem value="ine">Iné / Zmiešané</SelectItem>
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
                  <FormLabel className="text-base">Správa / Detaily (nepovinné)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mám záujem o vytepovanie rohovej sedačky a jedného koberca..."
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
              {isPending ? "Odosiela sa..." : (
                <>
                  Odoslať dopyt zadarmo
                  <CheckCircle2 className="ml-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                </>
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Vaše údaje sú v bezpečí. Odošlite formulár a my sa vám ozveme čo najskôr.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

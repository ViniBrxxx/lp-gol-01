import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const crmLeadSchema = z.object({
  phone: z.string().regex(/^\d{10,11}$/),
  name: z.string().trim().min(2).max(100),
  document: z.string().regex(/^\d{14}$/),
  city: z.string().trim().min(2).max(80),
  state: z.enum(["PI", "MA", "TO"]),
  pipeline_stage: z.literal("Qualificado"),
  empresa: z.string().trim().min(2).max(120),
  segmento: z.string().trim().min(2).max(80),
  faixa_investimento: z.enum([
    "Até R$ 5 mil",
    "De R$ 5 mil a R$ 10 mil",
    "De R$ 10 mil a R$ 20 mil",
    "Acima de R$ 20 mil",
  ]),
  linhas_interesse: z.array(z.enum(["Feminino", "Masculino", "Infantil", "Esportivo"])).min(1),
});

export const submitLeadToCrm = createServerFn({ method: "POST" })
  .validator(crmLeadSchema)
  .handler(async ({ data }) => {
    const response = await fetch(
      "https://newtracking-sales-sys.vercel.app/api/webhooks/leads/cmq0tkyiw0003dnk3jtdpcj6i",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("O CRM recusou o cadastro:", response.status, details);
      throw new Error(`Falha ao cadastrar lead no CRM (${response.status})`);
    }

    return { success: true };
  });

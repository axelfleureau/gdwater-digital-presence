
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactData {
  nome: string;
  cellulare: string;
  email: string;
  localita: string;
  messaggio: string;
}

// Configura SMTP client
const smtp = new SMTPClient({
  connection: {
    hostname: "smtp.gmail.com", // Sostituisci con il tuo provider SMTP
    port: 587,
    tls: false,
    auth: {
      username: Deno.env.get("SMTP_USERNAME") || "",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    },
  },
});

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Ricevi e valida i dati
    const contactData: ContactData = await req.json();

    if (!contactData.nome || !contactData.email || !contactData.cellulare) {
      return new Response(
        JSON.stringify({
          error: "Dati mancanti",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Formatta il messaggio email
    const htmlContent = `
      <h2>Nuova richiesta di contatto da GD Water</h2>
      <p><strong>Nome:</strong> ${contactData.nome}</p>
      <p><strong>Cellulare:</strong> ${contactData.cellulare}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Località:</strong> ${contactData.localita}</p>
      <p><strong>Messaggio:</strong> ${contactData.messaggio}</p>
      <hr>
      <p>Questo messaggio è stato inviato automaticamente dal form di contatto di GD Water.</p>
    `;

    // Invia l'email
    await smtp.send({
      from: Deno.env.get("EMAIL_FROM") || "noreply@gdwater.it",
      to: "contatti@gdwater.it",
      subject: `Nuova richiesta di contatto da ${contactData.nome}`,
      content: "Hai ricevuto un nuovo contatto dal sito web",
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Errore nella funzione send-notification:", error);

    return new Response(
      JSON.stringify({
        error: "Errore interno del server",
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

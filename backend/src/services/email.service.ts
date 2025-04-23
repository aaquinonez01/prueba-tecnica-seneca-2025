import nodemailer from "nodemailer";
import { envConfig } from "../config/envConfig";
import { HttpException } from "../utils/http.exception";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envConfig.EMAIL_HOST,
      port: Number(envConfig.EMAIL_PORT),
      secure: Number(envConfig.EMAIL_PORT) === 465,
      auth: {
        user: envConfig.EMAIL_USER,
        pass: envConfig.EMAIL_PASSWORD,
      },
    });
  }

  async sendActivationEmail(to: string, token: string): Promise<void> {
    const activationUrl = `${envConfig.FRONTEND_URL}/activate?token=${token}`;

    try {
      await this.transporter.sendMail({
        from: envConfig.EMAIL_FROM,
        to,
        subject: "Activación de cuenta",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Activación de Cuenta</h2>
            <p>Gracias por registrarte. Por favor, haz clic en el botón de abajo para activar tu cuenta:</p>
            <div style="margin: 20px 0;">
              <a href="${activationUrl}" 
                 style="background-color: #4CAF50; color: white; padding: 10px 20px; 
                        text-decoration: none; border-radius: 4px; display: inline-block;">
                Activar Cuenta
              </a>
            </div>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p>${activationUrl}</p>
            <p>Este enlace expirará en 24 horas.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("No se pudo enviar el correo de activación:", error);
      throw HttpException.internal("No se pudo enviar el correo de activación");
    }
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const resetUrl = `${envConfig.FRONTEND_URL}/reset-password?token=${token}`;

    try {
      await this.transporter.sendMail({
        from: envConfig.EMAIL_FROM,
        to,
        subject: "Solicitud de restablecimiento de contraseña",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Restablecimiento de Contraseña</h2>
            <p>Has solicitado restablecer tu contraseña. Por favor, haz clic en el botón de abajo para continuar:</p>
            <div style="margin: 20px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #2196F3; color: white; padding: 10px 20px; 
                        text-decoration: none; border-radius: 4px; display: inline-block;">
                Restablecer Contraseña
              </a>
            </div>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p>${resetUrl}</p>
            <p>Si no solicitaste este cambio, por favor ignora este correo.</p>
            <p>Este enlace expirará en 1 hora.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error(
        "No se pudo enviar el correo de restablecimiento de contraseña:",
        error
      );
      throw HttpException.internal(
        "No se pudo enviar el correo de restablecimiento de contraseña"
      );
    }
  }
}

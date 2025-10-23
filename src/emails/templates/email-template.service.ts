import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailTemplateService {
  generateCompanyNotificationTemplate(company: any): string {
    const formatDate = (date: string) => {
      return new Date(date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Empresa Cadastrada</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: system-ui, -apple-system, sans-serif; 
            background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f3e8ff 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
            overflow: hidden;
        }
        .email-header {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .logo-container {
            margin-bottom: 15px;
        }
        .logo-container img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .email-title {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-content {
            padding: 30px;
        }
        .greeting {
            font-size: 18px;
            color: #374151;
            margin-bottom: 20px;
        }
        .company-info {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .info-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .info-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .info-value {
            color: #111827;
            font-weight: 500;
            text-align: right;
            flex: 1;
            margin-left: 15px;
        }
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            transition: all 0.2s ease;
        }
        .action-button:hover {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }
        .email-footer {
            background: rgba(0, 0, 0, 0.05);
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .footer-link {
            color: #3b82f6;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            .email-header, .email-content, .email-footer {
                padding: 20px;
            }
            .info-row {
                flex-direction: column;
            }
            .info-value {
                text-align: left;
                margin-left: 0;
                margin-top: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <div class="logo-container">
                <img src="https://via.placeholder.com/80x80/3b82f6/ffffff?text=API" alt="Company API Logo" />
            </div>
            <h1 class="email-title">Nova Empresa Cadastrada</h1>
        </div>
        <div class="email-content">
            <p class="greeting">Olá! Uma nova empresa foi cadastrada no sistema.</p>
            <div class="company-info">
                <div class="info-row">
                    <span class="info-label">Nome da Empresa</span>
                    <span class="info-value">${company.name}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">CNPJ</span>
                    <span class="info-value">${company.cnpj}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Nome Fantasia</span>
                    <span class="info-value">${company.tradeName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Endereço</span>
                    <span class="info-value">${company.address}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Data de Cadastro</span>
                    <span class="info-value">${formatDate(company.createdAt)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Favorita</span>
                    <span class="info-value">${company.favorite ? '⭐ Sim' : '❌ Não'}</span>
                </div>
            </div>
            <div style="text-align: center;">
                <a href="http://localhost:8080/api" class="action-button">Acessar Sistema</a>
            </div>
        </div>
        <div class="email-footer">
            <p class="footer-text">Este é um email automático do sistema de gerenciamento de empresas.</p>
            <p class="footer-text">
                <a href="http://localhost:8080/api" class="footer-link">Acesse o sistema</a> | 
                <a href="mailto:contato@companyapi.com" class="footer-link">Contato</a>
            </p>
        </div>
    </div>
</body>
</html>`;
  }

  generateEmailConfirmationTemplate(email: string): string {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de Cadastro</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: system-ui, -apple-system, sans-serif; 
            background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f3e8ff 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
            overflow: hidden;
        }
        .email-header {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .logo-container {
            margin-bottom: 15px;
        }
        .logo-container img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .email-title {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #10b981, #059669);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-content {
            padding: 30px;
        }
        .greeting {
            font-size: 18px;
            color: #374151;
            margin-bottom: 20px;
        }
        .confirmation-info {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            border: 1px solid rgba(255, 255, 255, 0.2);
            text-align: center;
        }
        .email-address {
            font-size: 20px;
            font-weight: 600;
            color: #3b82f6;
            margin: 15px 0;
        }
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            transition: all 0.2s ease;
        }
        .action-button:hover {
            background: linear-gradient(135deg, #059669, #047857);
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }
        .email-footer {
            background: rgba(0, 0, 0, 0.05);
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .footer-link {
            color: #3b82f6;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <div class="logo-container">
                <img src="https://via.placeholder.com/80x80/10b981/ffffff?text=✓" alt="Company API Logo" />
            </div>
            <h1 class="email-title">E-mail Cadastrado com Sucesso!</h1>
        </div>
        <div class="email-content">
            <p class="greeting">Olá! Seu e-mail foi cadastrado com sucesso no sistema.</p>
            <div class="confirmation-info">
                <p>Você receberá notificações sobre:</p>
                <div class="email-address">${email}</div>
                <ul style="text-align: left; margin: 20px 0; color: #374151;">
                    <li>✨ Novas empresas cadastradas</li>
                    <li>📊 Atualizações do sistema</li>
                    <li>🔔 Notificações importantes</li>
                </ul>
            </div>
            <div style="text-align: center;">
                <a href="http://localhost:8080/api" class="action-button">Acessar Sistema</a>
            </div>
        </div>
        <div class="email-footer">
            <p class="footer-text">Este é um email automático do sistema de gerenciamento de empresas.</p>
            <p class="footer-text">
                <a href="http://localhost:8080/api" class="footer-link">Acesse o sistema</a> | 
                <a href="mailto:contato@companyapi.com" class="footer-link">Contato</a>
            </p>
        </div>
    </div>
</body>
</html>`;
  }
}

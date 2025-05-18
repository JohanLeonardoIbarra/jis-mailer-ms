# 📧 Microservicio de Envío de Correos

Este microservicio está diseñado para enviar correos electrónicos a través de una cola de mensajes (RabbitMQ). Utiliza
NestJS y escucha el patrón de mensaje `mail` para procesar solicitudes de envío de correos.

---

## 🚀 Comandos

Usa los siguientes comandos para iniciar el servicio en diferentes entornos:

```bash
# Desarrollo con hot-reload
npm run start:dev

# Modo debug
npm run start:debug

# Producción (requiere compilar previamente con `npm run build`)
npm run start:prod

# Inicio normal
npm run start
```

---

## 🧠 Comportamiento

### Escucha de eventos

El microservicio escucha mensajes con el patrón `mail` desde RabbitMQ. Cuando se recibe un mensaje, se llama al servicio
de correo para enviar el mensaje.

#### Controlador: `MailController`

```ts
@MessagePattern('mail')
test(@Payload()
data: Mail
)
{
  void this.MailService.sendMail(
    data.from,
    data.to,
    data.subject,
    data.text,
    data.html
  )
}
```

El mensaje debe tener la siguiente estructura:

```ts
interface Mail {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
```

---

## ⚙️ Variables de entorno

Asegúrate de definir las siguientes variables de entorno para conectar con RabbitMQ y el servidor SMTP:

### 🔄 RabbitMQ

| Variable    | Descripción                   |
|-------------|-------------------------------|
| `RMQ_HOST`  | Host del servidor de RabbitMQ |
| `RMQ_USER`  | Usuario de acceso             |
| `RMQ_PASS`  | Contraseña de acceso          |
| `RMQ_QUEUE` | Nombre de la cola a escuchar  |

### 📬 SMTP

| Variable    | Descripción                   |
|-------------|-------------------------------|
| `MAIL_HOST` | Host del servidor SMTP        |
| `MAIL_PORT` | Puerto del servidor SMTP      |
| `MAIL_USER` | Usuario de la cuenta de envío |
| `MAIL_PASS` | Contraseña de la cuenta       |

---

## 📝 Ejemplo de payload

```json
{
  "from": "no-reply@empresa.com",
  "to": "cliente@correo.com",
  "subject": "Confirmación de registro",
  "text": "Gracias por registrarte.",
  "html": "<b>Gracias por registrarte.</b>"
}
```

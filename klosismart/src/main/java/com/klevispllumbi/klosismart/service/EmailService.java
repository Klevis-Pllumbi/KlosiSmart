package com.klevispllumbi.klosismart.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.Year;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("classpath:static/images/logo.png")
    private Resource appLogo;

    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendVerificationEmail(String to, String name, String verificationUrl) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("verificationUrl", verificationUrl);
            context.setVariable("subject", "Verifikoni email-in tuaj");
            context.setVariable("message", "Ju falenderojmë që u regjistruat. Për të aktivizuar llogarinë tuaj, klikoni butonin më poshtë:");
            context.setVariable("year", Year.now().toString());

            String htmlContent = templateEngine.process("verification-email", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Verifikoni email-in tuaj");
            helper.setFrom("KlosiSmart <no-reply@klosismart.com>");
            helper.setText(htmlContent, true);
            helper.addInline("appLogo", appLogo);

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Dështoi dërgimi i email-it të verifikimit", e);
        }
    }

    public void sendResetPasswordEmail(String to, String name, String resetLink) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("resetLink", resetLink);
            context.setVariable("subject", "Ndryshoni Password");
            context.setVariable("message", "Ne ju vijmë në ndihmë për problemin tuaj. Duke klikuar butonin me poshtë do të jeni në gjendje të ndryshoni passwordin tuaj.");
            context.setVariable("year", Year.now().toString());

            String htmlContent = templateEngine.process("forgot-password-email", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Ndryshoni Password");
            helper.setFrom("KlosiSmart <no-reply@klosismart.com>");
            helper.setText(htmlContent, true);
            helper.addInline("appLogo", appLogo);

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Dështoi dërgimi i email-it të ndryshimit të password", e);
        }
    }

}

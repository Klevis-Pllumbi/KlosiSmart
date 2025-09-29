package com.klevispllumbi.klosismart.notifications.email;

import com.klevispllumbi.klosismart.model.User;
import com.klevispllumbi.klosismart.notifications.dto.BroadcastPayload;
import com.klevispllumbi.klosismart.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.Year;
import java.util.List;
import java.util.Locale;

// notifications/email/BulkEmailService.java
@Service
@RequiredArgsConstructor
public class BulkEmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final UserRepository subscriberRepository; // ekzistues tek projekti yt
    @Value("KlosiSmart <no-reply@klosismart.com>") private String from;
    @Value("classpath:static/images/logo.png")
    private Resource appLogo;

    public void broadcast(BroadcastPayload p, int batchSize) {
        List<String> recipients = subscriberRepository.findAllByIsSubscribedTrue().stream().map(User::getEmail).toList();
        for (int i=0; i<recipients.size(); i+=batchSize) {
            var batch = recipients.subList(i, Math.min(i + batchSize, recipients.size()));
            sendBatch(batch, p);
            sleepQuietly(400); // throttle i lehtë p.sh. 0.4s midis batch-eve
        }
    }

    private void sendBatch(List<String> batch, BroadcastPayload p) {
        for (String to : batch) {
            sendOne(to, p);
        }
    }

    private void sendOne(String to, BroadcastPayload p) {
        Context ctx = new Context(Locale.forLanguageTag("sq"));
        ctx.setVariable("subject", p.getSubject());
        ctx.setVariable("message", p.getMessage());
        ctx.setVariable("buttonText", p.getButtonText());
        ctx.setVariable("buttonUrl", p.getButtonUrl());
        ctx.setVariable("year", String.valueOf(Year.now().getValue()));

        String html = templateEngine.process(p.getTemplate(), ctx);
        MimeMessage mm = mailSender.createMimeMessage();
        try {
            MimeMessageHelper h = new MimeMessageHelper(mm, true, "UTF-8");
            h.setTo(to);
            h.setSubject(p.getSubject());
            h.setFrom(from);
            h.setText(html, true);
            h.addInline("appLogo", appLogo);
            mailSender.send(mm);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static void sleepQuietly(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ignored) {}
    }
}


package com.example.pizza_shop.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("AuditAwareBean")
public class AuditAwareBean implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("ROLE_USER");
    }
}

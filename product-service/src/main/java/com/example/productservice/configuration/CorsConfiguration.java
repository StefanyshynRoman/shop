package com.example.productservice.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")  // URL шляхи, які ви хочете дозволити для CORS
                        .allowedOrigins("http://localhost:4200")  // Дозволені джерела (frontend додаток)
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true);  // Дозволити передачу креденціалів (наприклад, куки, авторизація)
            }
        };
    }
}

package com.example.demo.Leaderboard;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // React server address
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS") // Enable the HTTP methods your API supports
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true);
    }
}

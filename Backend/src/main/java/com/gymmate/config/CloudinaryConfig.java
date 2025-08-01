package com.gymmate.config;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dwgxkvaaw",
            "api_key", "688955162597356",
            "api_secret", "6I15t2IJ7-O-iDN-DAAZOHEQesg"
        ));
    }
}


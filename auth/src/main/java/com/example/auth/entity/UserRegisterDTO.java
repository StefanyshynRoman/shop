package com.example.auth.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@Builder
public class UserRegisterDTO {
    @Length(min=5, max=50 , message = "Login must be 5 to 50 chairs")
    private String login;
    @Email
    private String email;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Length(min=8, max=75 , message = "Password must be 8 to 75 chairs")
    private String password;
    private Role role;
}

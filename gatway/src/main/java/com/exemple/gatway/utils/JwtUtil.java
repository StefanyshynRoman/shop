package com.exemple.gatway.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {
    public JwtUtil(@Value("${jwt.secret}") String secret){
        SECRET = secret;
    }
    public final String SECRET ;
  //  public static final String SECRET = "DD47EBD0310608D384914699733C3945AFAB6468C3181D6F02ADE4231BC3D347";

    public void validateToken(final String token) {
        Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token);
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

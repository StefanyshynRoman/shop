package com.example.auth.services;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component

public class JwtService {
    public JwtService(@Value("${jwt.secret}") String secret) {
        SECRET = secret;
        //this.exp=exp;
    }

    public final String SECRET;
    //  private final int exp;


    public void validateToken(final String token) throws ExpiredJwtException, IllegalArgumentException {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username, int exp) {
        Map<String, Objects> claims = new HashMap<>();
        return createToken(claims, username, exp);
    }

    public String createToken(Map<String, Objects> claims, String username, int exp) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + exp))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    public String getSubject(final String token) {
        return Jwts
                .parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String refreshToken(final String token, int exp) {
        String username = getSubject(token);
        return generateToken(username, exp);
    }
}

package com.exemple.gatway.filter;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;
@Component
public class RouteValidator {
    public static final List<String> openApiEndpoints = List.of(
          //  "/auth/register",
            "/auth/login",
            "/auth/validate"
    );
    public Predicate<ServerHttpRequest> isSecure =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(
                            uri -> request
                                    .getURI()
                                    .getPath()
                                    .contains(uri));

}
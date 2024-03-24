package com.example.auth.entity;

public enum Code {

    SUCCESS("Operation completed successfully"),
    PERMIT("Access granted"),
    A1("The user with the specified username does not exist or has not activated the account"),
    A2("The provided data is incorrect"),
    A3(" The specified token is empty or invalid"),
    A4("The user with the specified username already exists"),
    A5("The user with the specified email already exists"),
    A6("The user does not exist");

    public final String label;
   private Code(String label){
       this.label=label;
   }
}

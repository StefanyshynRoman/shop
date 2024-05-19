package com.example.order.exception;

public class UnKnowDeliverTypException extends RuntimeException{
    public UnKnowDeliverTypException() {
        super();
    }

    public UnKnowDeliverTypException(String message) {
        super(message);
    }

    public UnKnowDeliverTypException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnKnowDeliverTypException(Throwable cause) {
        super(cause);
    }
}

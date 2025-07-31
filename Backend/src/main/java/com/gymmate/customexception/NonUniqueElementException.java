package com.gymmate.customexception;

public class NonUniqueElementException extends RuntimeException {

	public NonUniqueElementException(String message) {
		super(message);
	}
	
}

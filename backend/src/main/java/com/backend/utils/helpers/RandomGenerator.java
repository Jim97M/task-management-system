package com.backend.utils.helpers;

import java.util.Random;

public class RandomGenerator {

    public static String generateOtp(){
        String chars = "0123456789";

        Random random = new Random();

        StringBuilder stringBuilder = new StringBuilder();

        for(int i =0; i < 4; i++) stringBuilder.append(chars.charAt(random.nextInt(chars.length())));

        return stringBuilder.toString();
    }
}

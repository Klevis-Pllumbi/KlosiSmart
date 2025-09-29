package com.klevispllumbi.klosismart.dto;

import java.util.List;

public record StatusBreakdownDto(
        String range,          // Today | Weekly | Monthly | Yearly
        List<String> labels,   // ["E_RE","NE_PROCES","E_ZGJIDHUR"]
        List<Long> data,       // [countEre, countNeProces, countEzgjidhur]
        long total             // totali në interval
) {}

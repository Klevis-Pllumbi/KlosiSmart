package com.klevispllumbi.klosismart.dto;

import java.util.List;

public record TimeSeriesDto(
        String range,              // Yearly | Monthly | Weekly | Today
        List<String> labels,       // p.sh. ["Jan", "Feb", ...] ose ["2025-09-01", ...] ose ["08:00", ...]
        List<Long> data,           // p.sh. [10, 12, 7, ...]
        long total                 // totali i kërkesave në interval
) {}

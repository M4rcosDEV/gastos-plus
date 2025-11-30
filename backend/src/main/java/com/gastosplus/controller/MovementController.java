package com.gastosplus.controller;

import com.gastosplus.dto.movement.CreateMovementDTO;
import com.gastosplus.dto.movement.MovementFilterDTO;
import com.gastosplus.dto.movement.MovementResponseDTO;
import com.gastosplus.entity.Movement;
import com.gastosplus.service.MovementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("movement")
@RequiredArgsConstructor
public class MovementController {

    private final MovementService movementService;

    @GetMapping
    public ResponseEntity<Page<MovementResponseDTO>> listAllFilter(
            MovementFilterDTO filter,
            @PageableDefault(size = 10, page = 0, sort = "dateMov", direction = Sort.Direction.DESC) Pageable pageable
    ){
        Page<MovementResponseDTO> movementsPage = movementService.findAllFilter(filter, pageable);
        return ResponseEntity.ok(movementsPage);
    }

    @GetMapping("/last-months")
    public ResponseEntity<?> lastMonths(@RequestParam Long userId, @RequestParam String type){
        return ResponseEntity.ok(movementService.getLast6Months(userId, type));
    }

    @PostMapping
    public ResponseEntity<String> newRegisterMovement(@RequestBody @Valid CreateMovementDTO data){
        movementService.registerMovement(data);

        return ResponseEntity.status(HttpStatus.CREATED).body("Movement register success");
    }

}

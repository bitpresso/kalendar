package com.github.bitpresso.kalendar.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.bitpresso.kalendar.server.models.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

}

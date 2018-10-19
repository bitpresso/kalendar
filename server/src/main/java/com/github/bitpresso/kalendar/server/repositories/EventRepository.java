package com.github.bitpresso.kalendar.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.bitpresso.kalendar.server.models.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}

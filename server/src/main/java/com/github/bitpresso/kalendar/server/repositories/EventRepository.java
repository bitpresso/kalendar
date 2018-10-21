package com.github.bitpresso.kalendar.server.repositories;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.github.bitpresso.kalendar.server.models.Event;

@CrossOrigin("*")
public interface EventRepository extends JpaRepository<Event, Long> {

	@Query("SELECT e FROM Event e WHERE e.end > :start AND e.start < :end ORDER BY e.start")
	public List<Event> period(@Param("start") Instant start, @Param("end") Instant end);

}

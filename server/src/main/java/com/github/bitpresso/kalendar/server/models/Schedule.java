package com.github.bitpresso.kalendar.server.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
public class Schedule implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private long id;
	
	@NotNull
	@NonNull
	private String title;
	
	@NotNull
	@NonNull
	private LocalDateTime start;
	
	@NotNull
	@NonNull
	private LocalDateTime end;

}

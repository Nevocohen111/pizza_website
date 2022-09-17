package com.example.pizza_shop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedBy
    @Column(updatable = false)
    @JsonIgnore
    private String createdBy;

    @CreatedDate
    @JsonIgnore
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedBy
    @JsonIgnore
    @Column(insertable = false)
    private String updatedBy;

    @LastModifiedDate
    @Column(insertable = false)
    @JsonIgnore
    private LocalDateTime updatedAt;

}

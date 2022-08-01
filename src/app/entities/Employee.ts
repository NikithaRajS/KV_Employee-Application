import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Department } from "./Department";

@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;
        @Column({ nullable: false })
        public joining_date: string;      //What format should be given to date?
        @Column({ nullable: false })       //Any other constraints?
        public role: string;  
        @Column({ nullable: false })
        public status: string; 
        @Column({ nullable: false })
        public experience: number;              
        @Column({ nullable: false })
        public address: number;    

        
        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;
        @Column({ nullable: false })
        public departmentId: string;
}
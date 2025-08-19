// based on Jonas Joseph's Respopnsive Timeline Concept
"use client";

import React from "react";

import styles from './Timeline.module.scss'

export default function Timeline() {
    return (
        <div className={styles.timeline}>
            <div className={styles.section}>
                <div className={styles.date}>
                    📆 2025 - Today
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                🚜 Master Thesis
                            </div>
                            <div className={styles.content}>
                                Image Data Curation in the Agricultural Domain: Using Deep Neural Networks and Image-Text-Alignment.
                            </div>
                            <div className={styles.footer}>
                                ML, Data Science, Transformer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.date}>
                    📆 2022 - 2023
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                🚁 Telematikprojekt
                            </div>
                            <div className={styles.content}>
                                Detecting radioactive radiation with an autonomous Drone and displaying it.
                            </div>
                            <div className={styles.footer}>
                                Drone, Automation, Sensors
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
             <div className={styles.section}>
                <div className={styles.date}>
                    📆 2021
                </div> 
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                🛣️ Bachelors Thesis
                            </div>
                            <div className={styles.content}>
                                Lane detection with a 3D camera in a Robotic Operating System with Open Computer Vision.
                            </div>
                            <div className={styles.footer}>
                                Image Recognition, Lane Detection, ROS
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            
            <div className={styles.section}>
                <div className={styles.date}>
                    📆 2018
                </div> 
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                🤖 NaoLino - Object detection
                            </div>
                            <div className={styles.content}>
                                Detecting different selected objects with the NAO robot and naming and pointing at them.
                            </div>
                            <div className={styles.footer}>
                                Robotics, Object Detection
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.section}>
                <div className={styles.date}>
                    📆 2017
                </div> 
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                ⚽ Ronaldo - Detecting and kicking a ball
                            </div>
                            <div className={styles.content}>
                                Detecting a red ball with a modified NIBO 2, aiming at the ball and kicking it with the robot.
                            </div>
                            <div className={styles.footer}>
                                Robotics, Image Recognition
                            </div>
                        </div>
                    </div>    
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                🏁 Parkourmeister - My First Robotics Project
                            </div>
                            <div className={styles.content}>
                                The goal of this project was to navigate a labyrinth like parcour and exiting it using a NIBO 2 robot.
                            </div>
                            <div className={styles.footer}>
                                Robotics, Navigation
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import Link from 'next/link';
import Image from 'next/image';

export default function ParkourmeisterContent() {
    return (
        <>
            <p className="lead font-monospace">
                The &quot;Parkourmeister&quot; project was the first part of a two-part robotics assignment in the Software Engineering I course of my bachelor studies. The task was to develop a control strategy for the NIBO 2 that could traverse a maze-like parcours with narrow passages and dead-ends. The goal was simple: reach the exit without getting stuck.
            </p>
            <p>
                This project is closely related to the <Link href="/projects/ronaldo">Ronaldo</Link> project, as both are part of the same assignment. The focus here was on reactive navigation using onboard sensors. The robot had to interpret its immediate surroundings and choose a safe movement based on local information alone.
            </p>

            <h3>Sensor Setup and Environment Model</h3>
            <p>
                To sense the terrain, the NIBO 2 used a combination of infrared and ground sensors. The front section contained five IR sensors facing left, right, straight ahead and diagonally forward, which allowed the robot to estimate whether walls were close by and from which direction they approached. In addition, ground sensors detected whether the robot was driving too close to an edge. These sensors were the foundation of the entire navigation logic.
            </p>
            <p>
                The robot&#39;s processing unit was an Atmel ATmega128A microcontroller, with limited computational power and memory. This meant that the navigation strategy had to be lightweight and efficient to be fast enough to react in real time during driving. Mappings or other path planning was not possible, so the robot had to rely on immediate sensor feedback and a simple decision-making process.
            </p>
            <p>
                The sensor data was not used in a probabilistic or geometric way; instead, it was reduced into a small set of qualitative states. The data from each sensor was categorized as either clear, close or blocked, depending on a threshold. This simplified the problem enough to implement a lightweight state machine directly on the robot.
            </p>
            <Image
                src="/assets/nibo_schematic.png"
                alt="Sensorlayout of the NIBO 2 robot"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
            />

            <h3>Reactive State Machine</h3>
            <p>
                The core of the solution was a simple finite-state machine. Depending on the current state and the current sensor readings, the robot would either continue its current behavior, transition to a new state or stop immediately. This was done to keep the implementation computationally cheap and robust in real time.
            </p>
            <p>
                The ground sensors had the highest priority. If they detected a missing floor, the robot immediately entered a stop state to prevent it from driving off an edge. In practice, this served as both a safety mechanism and a way to detect whether a passage ahead was still traversable.
            </p>
            <p>
                The IR sensors were used to detect surrounding walls and their proximity. If the front sensors indicated a wall ahead, the robot would stop or rotate depending on the desired turning strategy. If a side sensor was triggered, the robot could decide whether to turn left, turn right or continue forward. In this way, the robot reacted to the local environment rather than planning a path across the whole labyrinth.
            </p>
            <p>
                The behavior was designed around a clear priority order: stopping was preferred over left turns, left turns were preferred over straight movement, then right turns, and finally reversing. This preference created a consistent and deterministic strategy for resolving ambiguous situations. It was not an optimal maze-solver in the general case, but it was effective for the type of course used in the project.
            </p>

            <h3>Limitations and Design Trade-offs</h3>
            <p>
                This approach worked well for the parcours we had to solve because it was designed without loops. In such a maze, a local, preference-based strategy can eventually find the exit as long as the robot keeps moving and avoids dead ends. However, if a loop were present, the robot could become trapped in a cyclic route because it was not maintaining any memory of visited states or corridors.
            </p>
            <p>
                The design therefore traded global optimality for simplicity and reliability. The robot relied on immediate sensor feedback and a small number of fixed decision rules. For this project, that was the right compromise: easy to implement, fast to execute and sufficient for the given task.
            </p>

            <h3>Outcome & Learnings</h3>
            <p>
                The project was a strong introduction to embedded robotics and control systems. It showed how a relatively small set of sensors can be enough to implement a working navigation strategy when the system is designed carefully. More importantly, it demonstrated the importance of defining priorities, handling uncertainty and translating raw sensor data into simple robot behavior.
            </p>
            <p>
                The main learning outcome was the realization that simple, well-structured control logic can solve complex-seeming tasks when the environment is constrained. This project gave me a practical understanding of state-based system design, sensor interpretation and the trade-offs between robustness, complexity and performance in autonomous mobile robots.
            </p>
        </>
    );
}
import EditNote from '@/components/EditNote';
import Link from 'next/link';
import Image from 'next/image';

export default function ParkourmeisterContent() {
    return (
        <>
            <EditNote />
            <p>
                This project emerged out of the Software Engineering I course of my bachelor. This project has two parts, &quot;Parkourmeister&quot; and &quot;Ronaldo&quot;.
                Latter will not be covered here but can be found under <Link href="/projects/ronaldo">the ronaldo project</Link>.
            </p>
            <p>
                The task was to develop an algorithm to traverse the NIBO 2 through a labyrinth-like parcour with deadends and very slim sections. The
                goal was to reach the exit, which opened to an open area.
            </p>
            <p>
                To sense the environment, the NIBO 2 is equipped with multiple sensors as can be seen in the following image. It has 5 IR-Sensors in its
                front section facing left, right, front and diagonally to the front and each side. There are also floorsensors that sense, if there is a
                floor beneath these sensors. Besides these there are also linesensors, witch were not used in this project.
            </p>
            <Image
                src="/assets/nibo_sensors.png"
                alt="Sensorlayout of the NIBO 2 robot"
                width={800}
                height={400}
            />
            <p>
                The Algorithm to traverse the parcours was a simple state machine that acted depending on its sensor input. Dependent on the current state
                and its sensors the robot switches the state to another one or stay in the same state. These states shape the behavior of the robot.
            </p>
            <p>
                The floorsensors would stop the robot immediately and set it into the stop-state if they triggered. This is necessary to prevent the robot
                from falling off an edge. Besides that they acted as a detector that checks if a direction in front of the robot is blocked.
                <br />
                The IR sensors are used to sense walls and their proximity to the robot. There were two thresholds to seperate the detected data into three states:
                clear, close and blocked.
            </p>
            <p>
                The state-logic is vaguely summarized in the following table:
            </p>
            <table>
                <thead>
                    <tr><th>State</th><th>Input</th><th>Next State</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>STOP</td>
                        <td>no floor right or walls right</td>
                        <td>TURN LEFT</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>all sensors clear</td>
                        <td>MOVE FORWARD</td></tr>
                    <tr>
                        <td></td>
                        <td>no floor left or walls left</td>
                        <td>TURN RIGHT</td></tr>
                    <tr>
                        <td></td>
                        <td>has walls both sides and front or no floor</td>
                        <td>DEAD END</td></tr>
                    <tr>
                        <td>MOVE FORWARD</td>
                        <td>wall front or no floor to either or both sides</td>
                        <td>STOP</td></tr>
                    <tr>
                        <td></td>
                        <td>wall diagonally right</td>
                        <td>MOVE LEFT</td></tr>
                    <tr>
                        <td></td>
                        <td>wall diagonally left</td>
                        <td>MOVE RIGHT</td></tr>
                    <tr>
                        <td>MOVE LEFT</td>
                        <td>wall front or diagonally left</td>
                        <td>STOP</td></tr>
                    <tr>
                        <td></td>
                        <td>all sensors clear</td>
                        <td>MOVE FORWARD</td></tr>
                    <tr>
                        <td>MOVE RIGHT</td>
                        <td>wall front or diagonally right</td>
                        <td>STOP</td></tr>
                    <tr>
                        <td></td>
                        <td>all sensors clear</td>
                        <td>MOVE FORWARD</td></tr>
                    <tr>
                        <td>TURN LEFT</td>
                        <td>wall front or to the left</td>
                        <td>STOP</td></tr>
                    <tr>
                        <td></td>
                        <td>all sensors clear</td>
                        <td>MOVE FORWARD</td></tr>
                    <tr>
                        <td>TURN RIGHT</td>
                        <td>wall front or to the right</td>
                        <td>STOP</td></tr>
                    <tr>
                        <td></td>
                        <td>all sensors clear</td>
                        <td>MOVE FORWARD</td></tr>
                    <tr>
                        <td>DEAD END</td>
                        <td>left side clear</td>
                        <td>TURN LEFT</td></tr>
                    <tr>
                        <td></td>
                        <td>right side clear</td>
                        <td>TURN RIGHT</td>
                    </tr>
                </tbody>
            </table>
            <p>
                Algorithmically, the robot prefers stopping over left turns over straights over right turns over backwards. This way it may solve any labyrinth mithout loops.
                If there is a loop present in the labyrinth the robot may get trapped in this loop. But since the parcour to solve would not contain these, we
                did not have to solve this problem to complete the course.
            </p>
        </>
    );
}
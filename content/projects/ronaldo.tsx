import EditNote from '@/components/EditNote';
import Link from 'next/link';
import Image from 'next/image';

export default function RonaldoContent() {
    return (
        <>
            <p>
                The &quot;Ronaldo&quot; project is the second part of the <Link href="/projects/parkourmeister">Parkourmeister</Link> project. The task was to select and develop another engineering project for the Nibo2 robot. My partner and I decided to implement a project that would allow the robot to detect a red ball and navigate the robot to kick it by driving into it. We chose this topic specifically, because we were interested in the field of image recognition. The name of the project was inspired by the famous football player Cristiano Ronaldo.
            </p>
            <h3>Hardware and Inter-Process Communication</h3>
            <p>
                For this project we used a modified Nibo2 robot with additional features as displayed in the schema below. The Nibo was equipped with an extra layer on top of his construction that housed a Raspberry Pi 1 Model B and a low-cost USB-webcam. The Communication between both devices would be established over an wireless XBEE Module. The Raspberry acted as the high-level control unit. The Nibo was acting as a low-level actuator unit. The Raspberry would process images from the webcam and then send movement instructions to the Nibo over XBEE. The Nibo would then interpret and execute the instructions and manage motor execution, wheel speed and direction. It also manages the state of collision detection.
            </p>
            <Image
                src="/assets/modified_nibo_schematic.png"
                alt="schematic of the modified nibo robot"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
            />
            <h3>Computer Vision Pipeline</h3>
            <p>
                The goal of the visual processing pipeline was to detect a red ball in the field of view of the camera. This should be robust to different lighting conditions, shadows and reflections. The pipeline consisted of several steps. 
            </p>
            <p>
                First, the image was converted <b>from the RGB colorspace to the HSV colorspace</b>. This way the hue is isolated and can be used to threshold for the color range of the balls red. With saturation and value thresholds we could filter out pixels that are not red enough or too dark or bright.
            </p>
            <p>
                Next, the thresholds get applied to the image to create a binary mask of red pixels that likely belong to the ball. This was done using the <i>cvInRange</i> function from OpenCV.
            </p>
            <p> 
                The resulting binary mask was then processed with the <i>cvHoughCircles</i> function from OpenCV to detect circles in the image. The function returns the coordinates of the center of the largest detected circle and its radius. We assumed the largest circle would be the ball and other smaller circles would be noise, reflections, shadows or other artifacts.
            </p>
            <p>
                With the coordinates and the radius of the detected circle we could determine the position of the ball in the image and its size. Then we could use this information to determine the position of the ball relative to the robot dependend on the cameras position, angle and field of view. The position of the ball was then translated into movement instructions via a predetermined thresholding system. 
            </p>
            <Image
                src="/assets/ball_detection_thresholds.jpg"
                alt="visualization of the detection and threshold setting"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
            />
            <h3>Finite State Machine</h3>
            <p>
                To make the locating of the ball, approach and kick computationally cheap we implemented a simple finite state machine on the Raspberry. The state machine had three states: <b>SEARCH</b>, <b>APPROACH</b> and <b>SHOOT</b>. The state machine would switch between these states based on the position of the ball in the image and its size. The state machine would then send predefined movement instructions to the Nibo over XBEE. 
            </p>
            <p>
                During the <b>SEARCH</b> state the Nibo would rotate around itself slowly to get a 360 &#176; look. This would happen indefinitely as long as no ball can be found or a user would interrupt the process using a button on the Nibo. When a ball is detected the state machine would switch to the <b>APPROACH</b> state and the nibo would get a stop signal to stop rotating.
            </p>
            <p>
                The <b>APPROACH</b> state would first determine the position of the ball in the image and its size. Depending on this data a predefined movement instruction would be sent to the Nibo. The goal of the predefined movements was to get the ball in a good position for shooting. This was done with incremental movements and rotations to get the ball in the center of the image and to get close enough to the ball for a successful kick. If the ball was lost during the approach state the state machine would switch back to the <b>SEARCH</b> state. When the ball was in the optimal area of the image the state machine would switch to the <b>SHOOT</b> state.
            </p>
            <p>
                In the <b>SHOOT</b> state the Nibo would simply drive forward with high speed (for a Nibo) for a predefined amount of time until it hits the ball. After the <b>SHOOT</b> state the state machine would switch back to the <b>SEARCH</b> state to look for another ball.
            </p>
            <h3>Outcome & Learnings</h3>
            <p>
                The project was a great opportunity to apply the knowledge gained in the Software Engineering I course. We successfully implemented a working system that was able to detect a red ball and navigate the robot to kick it. We succesfully demonstrated reliable target detection and navigation in a controlled environment. We also showed that this was possible on very limited hardware with limited processing power, memory and sensor capabilities. 
            </p>
            <p>
                This project was an overall great learning experience. It challenged my partner and me to learn about computer vision by ourselves and to implement a working system on a real robot with limited resources. We learned a lot about the integration of different components and the challenges that come with it.
            </p>
        </>
    );
}
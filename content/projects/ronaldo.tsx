import EditNote from '@/components/EditNote';
import Link from 'next/link';
import Image from 'next/image';

export default function RonaldoContent() {
    return (
        <>
            <EditNote />
            <p>
                The Ronaldo project is the second part of the <Link href="/projects/parkourmeister">Parkourmeister</Link> project. The task was to detect a red ball and navigate the robot to kick it by driving into it. My project partner and I chose this task ourselves, because we were interested in the topic of image recognition.
            </p>
            <p>
                For this project we used a modified Nibo2 robot with additional features as displayed in the image below. The Nibo was equipped with an extra layer on top of his construction that housed a Raspberry Pi 1 Model B and a cheap webcam. The Communication between both devices would be established over an XBEE Module. The Master was on the Raspberry and the Client on the nibo. This was due to the Raspberry being the decision maker and the nibo just following instructions.
            </p>
            <Image
                src="/assets/modified_nibo2.png"
                alt="schematic of the modified nibo robot"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
            />
            <p>
                The detection of the ball was done by converting the colorspace of the image to hsv and matting the pixels in certain ranges to end up with red pixels only. With only red pixels apparent the image was searched for circles. For this the OpenCV functions cvCvtColor, cvInRange and cvHoughCircles were used. The Coordinates of the center of the ball would then determine the action of the nibo depending on the position in the frame.
            </p>
            <Image
                src="/assets/ball_detection_thresholds.jpg"
                alt="visualization of the detection and threshold setting"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
            />
            <p>
                The movement pattern of the Nibo consited of different States. First was the searching state where no ball could be detected. If a ball was found but not positioned well the Nibo would get into the approach state. If a ball was detected and positioned well the Nibo would go into the shooting state. The Raspberry would determine these states by thresholds on the balls position in frame. Then it would communicate a state switch over XBEE.
            </p>
            <p>
                In the search state the Nibo would rotate around itself to get a 360 &#176; look. This would happen indefinitely if no ball can be found. The approach state based on data provided by the Raspberry. Depending on this data the nibo would change its relative rotation and position to the ball. The goal would be to get the ball in a good position for shooting. In the shooting state the Nibo would approach the ball with high speed (for a Nibo) until he hits it.
            </p>
            <p>
                The result of this project was a success. In the demonstration ronaldo performed superb, maybe even better than his namesake. We also got a first glance at image recognition and OpenCV and were able to learn more about embedded systems.
            </p>
        </>
    );
}
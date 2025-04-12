"use client"; // Required for hooks

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation"; // Import the animation component

const Home = () => {
  // Define the text strings for animation
  const text1 = "Welcome to BHENDI!";
  // Combine the second line, using \n for the line break
  const text2 = "Your one-stop solution for\nall your needs of LENDING.";

  // State to control when the second animation (paragraph) should start
  const [startSecondAnimation, setStartSecondAnimation] = useState(false);

  // --- Animation Timing Calculation ---
  // Speed for text1 (ms per character)
  const speed1 = 200;
  // Pause after text1 (ms)
  const pause1 = 100;
  // Estimated duration for the first animation
  const duration1 = text1.length * speed1 + pause1;

  useEffect(() => {
    // Set a timer to trigger the second animation after the first one finishes
    const timer = setTimeout(() => {
      setStartSecondAnimation(true);
    }, duration1 - 1200); // Use calculated duration

    // Cleanup the timer if the component unmounts before it fires
    return () => clearTimeout(timer);
    // Dependency array ensures this effect runs only when duration1 changes,
    // or just once on mount if duration1 is constant.
  }, [duration1]);

  return (
    <div className="bg-black">
      {/* Navigation Bar */}
      <ul className="sticky top-0 z-[90] flex flex-row justify-between bg-black/65 backdrop-blur-md text-white p-4 font-sans">
        <p className="grow-[0.8] font-bold text-lg">BHENDI</p>
        {/* Using regular anchor tags for section links */}
        <a
          href="#hero"
          className="px-3  transition-all duration-300 hover:bg-[#39ff14] rounded-lg hover:text-black hover:shadow-[0_0_10px_4px_rgba(178,255,252,0.6)]"
        >
          Home
        </a>
        <a
          href="#about"
          className="px-3  transition-all duration-300 hover:bg-[#39ff14] rounded-lg hover:text-black hover:shadow-[0_0_10px_4px_rgba(178,255,252,0.6)]"
        >
          About Us
        </a>
        <a
          href="#how"
          className="px-3  transition-all duration-300 hover:bg-[#39ff14] rounded-lg hover:text-black hover:shadow-[0_0_10px_4px_rgba(178,255,252,0.6)]"
        >
          How It Works
        </a>
        {/* Corrected Next.js Link usage */}
        <Link
          href="/login"
          className="px-3  transition-all duration-300 hover:bg-[#39ff14] rounded-lg hover:text-black hover:shadow-[0_0_10px_4px_rgba(178,255,252,0.6)]"
        >
          Login
        </Link>
      </ul>

      {/* Hero Section */}
      <section id="hero">
        {/* Flex container for layout - REVERTED to original classes */}
        <div className="heroTop h-screen w-screen bg-black flex flex-row">
          {/* Text Area */}
          {/* Adjusted flex properties for vertical centering - KEPT as needed for text layout */}
          <div className="heroText text-white h-screen w-[50vw] flex flex-col justify-center items-center text-center p-8 font-sans">
            {/* Typewriter for Heading - KEPT */}
            <TypeAnimation
              sequence={[text1, pause1]} // Text sequence and pause
              wrapper="p" // Use <p> tag
              speed={speed1} // Typing speed
              cursor={false} // Hide cursor
              repeat={0} // Don't repeat
              // Apply original text styling if needed, plus display:inline-block
              style={{
                fontSize: "1.875rem",
                lineHeight: "2.25rem",
                display: "inline-block",
                marginBottom: "1rem",
              }} // Corresponds to text-3xl mb-4
            />

            {/* Conditionally render Typewriter for Second Text - KEPT */}
            {startSecondAnimation ? (
              <TypeAnimation
                sequence={[text2, 0]} // Text sequence and pause
                wrapper="p" // Use p tag
                speed={75} // Typing speed
                cursor={false} // Show cursor
                repeat={0} // Don't repeat
                // Apply styling and crucially whiteSpace for \n
                style={{
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                  whiteSpace: "pre-line",
                  display: "inline-block",
                }} // Corresponds to text-xl
              />
            ) : (
              // Placeholder to prevent layout shift (optional but recommended)
              // Ensure placeholder has same styles including whiteSpace
              <p
                style={{
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                  visibility: "hidden",
                  whiteSpace: "pre-line",
                  display: "inline-block",
                }}
              >
                {text2}
              </p>
            )}
          </div>

          {/* Picture/SVG Area - REVERTED to original structure and classes */}
          <div className="heroPic text-white h-screen w-[50vw] flex flex-row justify-center items-center">
            <svg
              className="absolute outer-circle"
              width="400"
              height="400"
              viewBox="0 0 400 400"
            >
              {/* Keyframes for pulsing glow effect */}
              <style jsx>{`
                @keyframes pulse-glow {
                  /* Using original glow color from user code */
                  0% {
                    filter: drop-shadow(0 0 10px rgba(178, 255, 252, 0.5));
                  }
                  25% {
                    filter: drop-shadow(0 0 25px rgba(178, 255, 252, 0.5));
                  }
                  50% {
                    filter: drop-shadow(0 0 40px rgba(178, 255, 252, 0.8));
                  }
                  75% {
                    filter: drop-shadow(0 0 25px rgba(178, 255, 252, 0.5));
                  }
                  100% {
                    filter: drop-shadow(0 0 10px rgba(178, 255, 252, 0.5));
                  }
                }
                .outer-circle {
                  /* Apply animation to circle inside */
                  animation: pulse-glow 4s infinite ease-in-out;
                }
                /* NOTE: This style applies animation to the SVG element itself,
                   If you want the *circle* inside to glow, target '.outer-circle circle' */
              `}</style>
              {/* Reverted circle element */}
              <circle cx="200" cy="200" r="200" fill="grey" />
            </svg>
            {/* Reverted inner black circle */}
            <svg
              className="absolute z-10"
              width="300"
              height="300"
              viewBox="0 0 300 300"
            >
              <circle cx="150" cy="150" r="150" fill="black" />
            </svg>
            {/* Reverted Logo SVG */}
            <svg
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 477.17 300"
              width="100"
              height="63"
              xmlns="http://www.w3.org/2000/svg"
              fill="#39FF14"
              className="absolute z-30"
            >
              <title>ANONAADHAAR</title>
              {/* SVG paths remain the same */}
              <g id="layer1">
                <g id="g10">
                  <g id="g12">
                    <path
                      id="path14"
                      d="M445.26,116.13h0a32.11,32.11,0,0,0-4.37,13.42,91.94,91.94,0,0,1-4.16,17.12,45.49,45.49,0,0,1-14.5,20,188.62,188.62,0,0,0-33.46-56.23,47.44,47.44,0,0,1,25-2.3,92.64,92.64,0,0,1,17.38,5,34.5,34.5,0,0,0,14.1,3Z"
                    />
                    <path
                      id="path16"
                      d="M358,31.19h0A32.37,32.37,0,0,0,361,45a86,86,0,0,1,5.14,16.87,44.43,44.43,0,0,1-2.36,24.43A196.86,196.86,0,0,0,306,53.73a46.36,46.36,0,0,1,20.56-14.17,90.89,90.89,0,0,1,17.63-4.05A35.19,35.19,0,0,0,357.9,31.2Z"
                    />
                    <path
                      id="path18"
                      d="M431.48,199.74a46.86,46.86,0,0,1,22.72,10,87.78,87.78,0,0,1,12.69,13.17,33.12,33.12,0,0,0,10.28,9.46h-43A187.09,187.09,0,0,0,431.48,199.74Z"
                    />
                    <path
                      id="path20"
                      d="M119.23,31.19h0A35,35,0,0,0,133,35.49a90.19,90.19,0,0,1,17.63,4.06,46.22,46.22,0,0,1,20.56,14.17,196.46,196.46,0,0,0-57.82,32.53A43.89,43.89,0,0,1,111,61.82a86.09,86.09,0,0,1,5.14-16.88,32.36,32.36,0,0,0,3.14-13.76Z"
                    />
                    <path
                      id="path22"
                      d="M31.92,116.13h0a34.35,34.35,0,0,0,14.1-3,93.05,93.05,0,0,1,17.37-5,47.44,47.44,0,0,1,25,2.3A188.62,188.62,0,0,0,55,166.65a45.47,45.47,0,0,1-14.49-20A92,92,0,0,1,36.3,129.5a32.39,32.39,0,0,0-4.37-13.42Z"
                    />
                    <path
                      id="path24"
                      d="M0,232.37a33.79,33.79,0,0,0,10.64-9.46,87.14,87.14,0,0,1,12.44-12.82,46.83,46.83,0,0,1,22.71-10A188.25,188.25,0,0,0,43,232.57Z"
                    />
                    <path
                      id="path26"
                      d="M238.58,0h0a33.51,33.51,0,0,0,9.71,10.41,85.08,85.08,0,0,1,13.42,12.07A44.79,44.79,0,0,1,272,45.06a204.08,204.08,0,0,0-66.81,0A44.81,44.81,0,0,1,215.7,22.73a85.18,85.18,0,0,1,13.16-12.07A33.57,33.57,0,0,0,238.58,0Z"
                    />
                  </g>
                  <g id="g28">
                    <path
                      id="path30"
                      d="M198.83,232.7h14.75c1.95-12.11-1.85-21.47-14.44-19.27-10.64,1.9-22,12.17-28.94,19.27h19.42c2.16-1.35,6.43-2.95,8.17-1.75A2.19,2.19,0,0,1,198.83,232.7Z"
                    />
                    <path
                      id="path32"
                      d="M265.48,232.65h18.4a121.51,121.51,0,0,0-12.71-62,58.69,58.69,0,0,0-44.1-31.74c-28.74-4.11-57.67,7.71-82.24,24.68-26.63,18.44-48.67,43.51-67.74,69H101.4c21.89-30,72.27-76.1,109.32-76.4a48.59,48.59,0,0,1,32.69,10.31c6.42,5.61,14.24,16.42,13.83,25,0,5.25-5.14,6.86-9.56,5a20.32,20.32,0,0,1-8.48-7.71,36.06,36.06,0,0,0-34.44-14.22c-16.44,2.21-36.85,14.62-50,25.94a309.45,309.45,0,0,0-31.55,31.69h25.86a134,134,0,0,1,32.74-28.79,75.55,75.55,0,0,1,14.49-6.91c13.47-4.5,26.83-3.35,32.79,13a50.47,50.47,0,0,1,2,22.33v.42h17.78v-.5c0-5.66,0-9.47.37-15,.47-5,2-10,6.63-10.42,9.77-2,9.25,19.18,9.46,26Z"
                    />
                    <path
                      id="path34"
                      d="M303.25,232.65h18.56a185.8,185.8,0,0,0-7.35-63.23A118.81,118.81,0,0,0,310,157.76a98.88,98.88,0,0,0-15.42-24.09,107.19,107.19,0,0,0-24.86-21.27c-2.83-1.71-5.71-3.26-8.69-4.7h0a98,98,0,0,0-9.2-3.76h0c-36-12.51-72.73-3.61-103.41,12.62q-9,4.8-17.22,10.27c-5.5,3.65-10.69,7.41-15.42,11.26h0a211.07,211.07,0,0,0-20.56,18.37c-1.44,1.45-2.83,3-4.16,4.46-3.65,4-9.3,9.66-7.61,15.52,1.28,4.61,7.45,3.25,9.56,1.65a60.07,60.07,0,0,0,9.77-7c4.16-3.46,8.12-7.16,12.28-10.67a206.29,206.29,0,0,1,51.4-32.34c3.75-1.6,7.5-3,11.2-4.36s7.45-2.35,11.1-3.3h0c32-8.06,66.82-2.8,88.87,22.53,21.44,24.43,25.34,57.17,25.7,89.67ZM72.89,205a56.71,56.71,0,0,0,6.16-6.81,9.27,9.27,0,0,0,2.06-10,6.63,6.63,0,0,0-1.86-2.41,7.23,7.23,0,0,0-2.67-1.3,7.9,7.9,0,0,0-7.76,3.2,32.46,32.46,0,0,0-7.14,14.17,9.12,9.12,0,0,0,0,2.66,6.12,6.12,0,0,0,.72,2.35h0a3.34,3.34,0,0,0,3.08,1.81h2a13.41,13.41,0,0,0,5.4-3.66Z"
                    />
                    <path
                      id="path36"
                      d="M349.51,232.65h0a8.26,8.26,0,0,0,7.25-4,11.33,11.33,0,0,0,1-2.2,14.55,14.55,0,0,0,.52-2.86h0c1.48-50.06-14.34-91.77-41.12-120.15a134.35,134.35,0,0,0-16.86-15A129.52,129.52,0,0,0,281.2,76.76h0a144.14,144.14,0,0,0-87.73-11.51c-4.83.9-9.62,2-14.35,3.35h0A165.5,165.5,0,0,0,110,109.89c-3.81,3.81-7.46,7.71-10.9,11.82-1.7,2.05-3.34,4.1-5.14,6.21a247.91,247.91,0,0,1,43.87-29.69c3.49-1.8,6.93-3.5,10.27-5s7-3.06,10.59-4.41h0a165.09,165.09,0,0,1,40.4-10,153,153,0,0,1,40.5,1,128,128,0,0,1,27.65,7.46c1.7.65,3.29,1.4,5.14,2.17a40.12,40.12,0,0,1,4.68,2.35h0c30,16,50.88,48.92,60.08,86a176.42,176.42,0,0,1,5.45,44.76h0v.4a10.67,10.67,0,0,0,4,8.87,6.11,6.11,0,0,0,1.48.65h0a6.05,6.05,0,0,0,1.7,0Z"
                    />
                    <path
                      id="path38"
                      d="M295.17,65.29c74.16,23.9,124.35,91.28,124.68,167.36H384.13c2.36-68.14-28.17-129.67-89-167.36Z"
                    />
                  </g>
                  <path
                    id="path40"
                    d="M86.33,287.11H71.92l-3.54,12.26H56.87l15.39-47H86.82l15.39,47h-12Zm-12.82-7.92H84.58c-2.87-9.21-4.77-15.47-5.64-18.92h0l-2.25,9-3,10Zm65.74,7.92H124.84l-3.54,12.26H109.76l15.39-47h14.56l15.39,47H143.2Zm-12.77-7.92h11.08c-2.93-9.21-4.77-15.47-5.64-18.92h0l-2.26,9-3,10Zm39.7,20V253.06A104.28,104.28,0,0,1,181.57,252a31.81,31.81,0,0,1,22.05,6.26,21.66,21.66,0,0,1,6.77,16.57,23.15,23.15,0,0,1-7.64,18.52,35.25,35.25,0,0,1-23.65,6.51,107.35,107.35,0,0,1-12.92-.7Zm11.08-38.45v30.59a22.27,22.27,0,0,0,4,0A17.87,17.87,0,0,0,194,287.11,15.85,15.85,0,0,0,198.48,275a14.22,14.22,0,0,0-4.1-11.06,17,17,0,0,0-11.85-3.81,24.38,24.38,0,0,0-5.12.45Zm44.82-8.31h11v18.07H252V252.41h11.08v47H252V279.86H233.11v19.51h-11Zm81.13,34.7H288.8l-3.59,12.26h-11.5l15.38-47h14.57l15.64,47h-12l-3.95-12.26Zm-12.77-7.91h11.08c-2.93-9.22-4.83-15.47-5.64-18.93h0l-2.31,9-3,10Zm65.74,7.91h-14.4l-3.59,12.26H326.68l15.39-47h14.56l15.64,47h-12l-3.89-12.26Zm-12.76-7.91h11c-2.87-9.22-4.77-15.47-5.64-18.93h0l-2.31,9-3,10Zm39.64,20V253.06A88.63,88.63,0,0,1,398,252a27.26,27.26,0,0,1,15.75,3.51,11.74,11.74,0,0,1,4.76,10,11.36,11.36,0,0,1-2.41,7.06,12.67,12.67,0,0,1-6.25,4.45h0a11.7,11.7,0,0,1,6.51,8.68q3.71,12.61,4,13.37H409.06a54.44,54.44,0,0,1-3.44-10.91,11.68,11.68,0,0,0-2.71-5.86,7.61,7.61,0,0,0-5.49-1.7H394v18.77ZM394,260.17v12.92h4.57a10.4,10.4,0,0,0,6.71-1.75,5.82,5.82,0,0,0,2.36-5,5.72,5.72,0,0,0-2.15-5,9.84,9.84,0,0,0-6.1-1.7,27.5,27.5,0,0,0-5.13.36Z"
                  />
                </g>
              </g>
            </svg>
            {/* Reverted Phone Image */}
            <img className="z-20" src="phone.png" alt="" />
          </div>
        </div>
      </section>
      <section id="about">
        <div className="abtWrapper w-screen h-screen bg-black flex flex-col justify-center items-center">
          <div className="abt">
            <h1 className="text-white text-[8vh]">About Us</h1>
          </div>
          <div className="features w-screen h-[40vh] pt-[30vh] flex flex-row justify-center items-center text-white">
            <div className="feature1 h-[40vh] w-[30vw] flex flex-col justify-center item-start border-2 border-[#39ff14] rounded-lg m-4 p-[2rem] hover:border-[#B2FFFC] transition-border duration-500 hover:shadow-[0_0_20px_4px_rgba(178,255,252,0.6)]">
              <svg
                width="100px"
                height="100px"
                viewBox="0 0 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M11.302 21.6149C11.5234 21.744 11.6341 21.8086 11.7903 21.8421C11.9116 21.8681 12.0884 21.8681 12.2097 21.8421C12.3659 21.8086 12.4766 21.744 12.698 21.6149C14.646 20.4784 20 16.9084 20 12V6.6C20 6.04207 20 5.7631 19.8926 5.55048C19.7974 5.36198 19.6487 5.21152 19.4613 5.11409C19.25 5.00419 18.9663 5.00084 18.3988 4.99413C15.4272 4.95899 13.7136 4.71361 12 3C10.2864 4.71361 8.57279 4.95899 5.6012 4.99413C5.03373 5.00084 4.74999 5.00419 4.53865 5.11409C4.35129 5.21152 4.20259 5.36198 4.10739 5.55048C4 5.7631 4 6.04207 4 6.6V12C4 16.9084 9.35396 20.4784 11.302 21.6149Z"
                    stroke="#39FF14"
                    stroke-width="0.9600000000000002"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <br />
              <h1 className="text-[4vh]">Privacy Preserving</h1>
              <br />
              <p className="text-[#bcbcbc]">
                Zero-knowledge proofs are used to ensure that sensitive
                information is not exposed while still allowing verification of
                the transaction.
              </p>
            </div>
            <div className="feature2 h-[40vh] w-[30vw] flex flex-col justify-center item-start border-2 border-[#ffe357] rounded-lg m-4 p-[2rem] hover:border-orange-500 transition-border duration-500 hover:shadow-[0_0_20px_4px_rgba(249,115,22,0.6)]">
              <svg
                width="100px"
                height="100px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffe357"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M16 8.00169L16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8.00169M16 8.00169C15.7563 8 15.4907 8 15.2 8H8.8C8.50929 8 8.24373 8 8 8.00169M16 8.00169C17.1649 8.00979 17.8313 8.05658 18.362 8.32698C18.9265 8.6146 19.3854 9.07354 19.673 9.63803C20 10.2798 20 11.1198 20 12.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V12.8C4 11.1198 4 10.2798 4.32698 9.63803C4.6146 9.07354 5.07354 8.6146 5.63803 8.32698C6.16873 8.05658 6.83507 8.00979 8 8.00169M10 11V18M14 11V18M8.5 12.5H15.5M8.5 16.5H15.5"
                    stroke="#ffe357"
                    stroke-width="0.9600000000000002"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <br />
              <h1 className="text-[4vh]">Secure Verification</h1>
              <br />
              <p className="text-[#bcbcbc]">
                KYC and Aadhaar verification are done using secure methods to
                ensure no compromising of personal data.
              </p>
            </div>
            <div className="feature3 h-[40vh] w-[30vw] flex flex-col justify-center item-start border-2 border-[#39ff14] rounded-lg m-4 p-[2rem] hover:border-[#B2FFFC] transition-border duration-500 hover:shadow-[0_0_20px_4px_rgba(178,255,252,0.6)]">
              <svg
                width="100px"
                height="100px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#39FF14"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z"
                    stroke="#39FF14"
                    stroke-width="0.9600000000000002"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <br />
              <h1 className="text-[4vh]">Competitive Rates</h1>
              <br />
              <p className="text-[#bcbcbc]">
                Get the best lending and borrowing rates in the decentralized
                finance space.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="how" className="bg-black pt-[10vh]">
        <div className="howWrapper w-screen h-screen bg-black flex flex-col  items-center">
          <h1 className="text-white text-[8vh] pb-[10vh]">How It Works</h1>
          <div className="steps">
            <div className="step1 h-[40vh] w-[30vw] flex flex-col justify-center item-start border-2 border-[#ffffff] rounded-lg m-4 p-[2rem] hover:border-[#808000] hover:bg-[#404000] transition-border duration-300 hover:shadow-[0_0_20px_4px_rgba(128,128,0,0.6)]">
              <div className="bg-[#ffffff] rounded-full overflow-hidden h-[10vh] w-[10vh] text-black text-[4vh] flex flex-col justify-center items-center">
                1
              </div>
              <br />
              <h1 className="text-white underline text-[4vh]">
                Verify Identity
              </h1>
              <br />
              <p className="text-[#bcbcbc]">
                Complete KYC and Aadhaar verification securely using zero
                knowledge proofs.
              </p>
            </div>
            <div className="step1 h-[40vh] w-[30vw] flex flex-col justify-center item-start border-2 border-[#ffffff] rounded-lg m-4 p-[2rem] hover:border-[#B2FFFC] hover:bg-gray-900 transition-border duration-300 hover:shadow-[0_0_20px_4px_rgba(178,255,252,0.6)]">
              <div className="bg-[#ffffff] rounded-full overflow-hidden h-[10vh] w-[10vh] text-black text-[4vh] flex flex-col justify-center items-center">
                2
              </div>
              <br />
              <h1 className="text-white underline text-[4vh]">
                Connect Wallet
              </h1>
              <br />
              <p className="text-[#bcbcbc]">
                Link your cryptocurrency wallet to access the platform's
                features.
              </p>
            </div>
            <div className="step1 h-[40vh] w-[30vw] flex flex-col justify-center item-start border-2 border-[#ffffff] rounded-lg m-4 p-[2rem] hover:border-[#39FF14] hover:bg-[#004400] transition-border duration-300 hover:shadow-[0_0_15px_2px_rgba(57,255,20,0.5)]">
              <div className="bg-[#ffffff] rounded-full overflow-hidden h-[10vh] w-[10vh] text-black text-[4vh] flex flex-col justify-center items-center">
                3
              </div>
              <br />
              <h1 className="text-white underline text-[4vh]">
                Lend or Borrow
              </h1>
              <br />
              <p className="text-[#bcbcbc]">
                Start lending your assets or borrow against your collateral with
                competitive rates.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="ready">
        <div className="readyWrapper w-screen h-screen bg-black flex flex-col justify-center items-center">
          <h1 className="text-white text-[8vh]">Ready to get started?</h1>
          <br />
          <p className="text-[#bcbcbc] text-[4vh]">
            Join thousands of users who are already benefiting from our secure
            lending platform.
          </p>
          <br />
          <Link
            href="/login"
            className="bg-[#39FF14] text-black text-[4vh] rounded-full px-10 py-4 hover:bg-[#B2FFFC] transition-all duration-500 hover:shadow-[0_0_20px_4px_rgba(178,255,252,0.6)]"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

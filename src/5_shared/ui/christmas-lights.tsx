import { FC } from "react";

const ChristmasLights: FC = () => {
  return (
    <ul className="christmas-lights w-[calc(100vw+64px)] absolute inset-0 whitespace-nowrap overflow-hidden z-10 pointer-events-none text-center p-0 -ml-16 -mt-5">
      {Array.from({ length: 100 }).map((_, i) => (
        <li key={i} />
      ))}
      <style>{`
          .christmas-lights li {
            position: relative;
            display: inline-block;
            list-style: none;
            width: 12px;
            height: 28px;
            border-radius: 50%;
            margin: 20px;
            background: #fff;
            animation-fill-mode: both;
            animation-iteration-count: infinite;
            animation-name: flash-1;
            animation-duration: 2s;
          }
          .christmas-lights li:nth-child(2n+1) {
            background: cyan;
            animation-name: flash-2;
            animation-duration: 0.4s;
          }
          .christmas-lights li:nth-child(4n+2) {
            background: #f70094;
            animation-name: flash-3;
            animation-duration: 1.1s;
          }
          .christmas-lights li:nth-child(odd) {
            animation-duration: 1.8s;
          }
          .christmas-lights li:nth-child(3n+1) {
            animation-duration: 1.4s;
          }
          .christmas-lights li:first-child {
            visibility: hidden;
          }
          .christmas-lights li:first-child::after {
            visibility: visible;
          }
          .christmas-lights li:before {
            content: "";
            position: absolute;
            background: #222;
            width: 10px;
            height: 9px;
            border-radius: 3px;
            top: -4px;
            left: 1px;
          }
          .christmas-lights li:after {
            content: "";
            top: -14px;
            left: 9px;
            position: absolute;
            width: 52px;
            height: 18px;
            border-bottom: solid #222 2px;
            border-radius: 50%;
          }
          .christmas-lights li:last-child:after {
            content: none;
          }
          @keyframes flash-1 {
            0%, 100% { background: #00f7a5; box-shadow: 0px 2px 20px 4px #00f7a5; }
            50% { background: rgba(0,247,165,0.4); box-shadow: 0px 2px 20px 4px rgba(0,247,165,0.2); }
          }
          @keyframes flash-2 {
            0%, 100% { background: cyan; box-shadow: 0px 2px 20px 4px cyan; }
            50% { background: rgba(0,255,255,0.4); box-shadow: 0px 2px 20px 4px rgba(0,255,255,0.2); }
          }
          @keyframes flash-3 {
            0%, 100% { background: #f70094; box-shadow: 0px 2px 20px 4px #f70094; }
            50% { background: rgba(247,0,148,0.4); box-shadow: 0px 2px 20px 4px rgba(247,0,148,0.2); }
          }
        `}</style>
    </ul>
  );
};

export default ChristmasLights;

export default function GameLogo({ className }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '1em', height: '1em' }}
    >
      <path d="M20 4H8C6.9 4 6 4.9 6 6V18C6 19.1 6.9 20 8 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H8V6H20V18ZM4 8H2V20C2 21.1 2.9 22 4 22H18V20H4V8Z"/>
    </svg>
  );
}

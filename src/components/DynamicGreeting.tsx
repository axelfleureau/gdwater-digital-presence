
import { useState, useEffect } from "react";

interface DynamicGreetingProps {
  className?: string;
}

const DynamicGreeting = ({ className = "" }: DynamicGreetingProps) => {
  // Since we're removing the greeting functionality, this component is now empty
  return null;
};

export default DynamicGreeting;

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600">© 2025 MyStore. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="text-indigo-600 hover:underline">Privacy</a>
          <a href="#" className="text-indigo-600 hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}

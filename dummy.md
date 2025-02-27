   <div className="flex flex-col gap-2">
              <p>War frequency</p>
              <div className="flex items-center bg-white border border-gray-300 rounded-full w-fit">
                {/* Left Arrow */}
                <button
                  className="py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
                  onClick={handleDecrement}
                >
                  &#10094; {/* HTML entity for left arrow */}
                </button>

                {/* Input Field */}
                <input
                  type="text"
                  value={arr[index]} // Display the current value from the array
                  name="war input"
                  readOnly
                  className="w-48 lg:w-64 text-center border-0 outline-none"
                />

                {/* Right Arrow */}
                <button
                  className="py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
                  onClick={handleIncrement}
                >
                  &#10095; {/* HTML entity for right arrow */}
                </button>
              </div>
            </div>
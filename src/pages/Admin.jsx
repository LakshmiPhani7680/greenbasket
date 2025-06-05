import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Admin = () => {
  const [vegetables, setVegetables] = useState([]);
  const [newVeg, setNewVeg] = useState({
    name: { en: "", te: "", hi: "" },
    price: "",
    availability: true,
    delivery_time: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVegetables();
  }, []);

  const fetchVegetables = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/vegetables");
      setVegetables(res.data.default || res.data); // Ensure we are working with an array
      setError("");
    } catch (err) {
      console.error("Failed to fetch vegetables", err);
      setError("Failed to fetch vegetables");
    }
    setLoading(false);
  };

  const handleChange = (lang, value) => {
    setNewVeg((prev) => ({
      ...prev,
      name: { ...prev.name, [lang]: value },
    }));
  };

  const addVegetable = async () => {
    if (!newVeg.name.en || !newVeg.price || !newVeg.delivery_time) {
      setError("Please fill all required fields.");
      return;
    }

    const vegPayload = {
      name: newVeg.name,
      price: +newVeg.price,
      unit: "kg", // default unit (optional)
      availability: newVeg.availability,
      delivery_time: newVeg.delivery_time,
      image: newVeg.image || "/images/default.jpg",
    };

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/vegetables", vegPayload);
      fetchVegetables();
      setNewVeg({
        name: { en: "", te: "", hi: "" },
        price: "",
        availability: true,
        delivery_time: "",
        image: "",
      });
      setError("");
    } catch (err) {
      console.error("Failed to add/update vegetable", err);
      setError("Failed to add/update vegetable");
    }
    setLoading(false);
  };

  const deleteVeg = async (id) => {
    if (window.confirm("Are you sure you want to delete this vegetable?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/vegetables/${id}`);
        setVegetables((prev) => prev.filter((veg) => veg.id !== id));
        setError("");
      } catch (err) {
        console.error("Failed to delete vegetable", err);
        setError("Failed to delete vegetable");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center drop-shadow-lg">
          Admin Panel
        </h2>

        {error && (
          <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
        )}
        {loading && (
          <p className="mb-4 text-center text-green-700">Loading...</p>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-100">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Name (English)*"
              value={newVeg.name.en}
              onChange={(e) => handleChange("en", e.target.value)}
              className="border border-lime-300 p-2 rounded focus:ring-2 focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Name (Telugu)"
              value={newVeg.name.te}
              onChange={(e) => handleChange("te", e.target.value)}
              className="border border-lime-300 p-2 rounded focus:ring-2 focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Name (Hindi)"
              value={newVeg.name.hi}
              onChange={(e) => handleChange("hi", e.target.value)}
              className="border border-lime-300 p-2 rounded focus:ring-2 focus:ring-green-300"
            />
            <input
              type="number"
              placeholder="Price (₹)*"
              value={newVeg.price}
              onChange={(e) => setNewVeg({ ...newVeg, price: e.target.value })}
              className="border border-lime-300 p-2 rounded focus:ring-2 focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Delivery Time (e.g. 30 min)*"
              value={newVeg.delivery_time}
              onChange={(e) =>
                setNewVeg({ ...newVeg, delivery_time: e.target.value })
              }
              className="border border-lime-300 p-2 rounded focus:ring-2 focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Image Path (e.g. /images/carrot.jpg)"
              value={newVeg.image}
              onChange={(e) => setNewVeg({ ...newVeg, image: e.target.value })}
              className="border border-lime-300 p-2 rounded focus:ring-2 focus:ring-green-300"
            />
            <label className="flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                checked={newVeg.availability}
                onChange={(e) =>
                  setNewVeg({ ...newVeg, availability: e.target.checked })
                }
                className="accent-green-600"
              />
              <span className="text-green-700 font-medium">Available</span>
            </label>
          </div>
          <button
            onClick={addVegetable}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-green-500 to-lime-500 text-white px-6 py-2 rounded-full font-bold shadow hover:from-green-600 hover:to-lime-600 transition-colors duration-200 disabled:opacity-50"
          >
            Add / Update Vegetable
          </button>
        </div>

        <div className="space-y-6">
          {vegetables.map((veg) => (
            <div
              key={veg.id}
              className="bg-white border border-green-100 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center p-4 gap-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center gap-4 w-full">
                {veg.image && (
                  <img
                    src={veg.image}
                    alt={veg.name.en}
                    className="w-20 h-20 object-cover rounded-full border-4 border-lime-200 shadow-sm"
                  />
                )}
                <div>
                  <h3 className="font-bold text-green-700 text-lg">
                    {veg.name.en}
                  </h3>
                  <p className="text-orange-700 font-semibold">₹ {veg.price}</p>
                  <p className="text-gray-500 text-sm">{veg.delivery_time}</p>
                  <p
                    className={
                      veg.availability
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    Status: {veg.availability ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteVeg(veg.id)}
                className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-full font-semibold border border-red-200 transition-colors duration-150 disabled:opacity-50"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;

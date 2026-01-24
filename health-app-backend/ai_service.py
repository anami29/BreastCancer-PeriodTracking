from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
# CORS is essential so your React app (Port 3000) can talk to this script
CORS(app)


@app.route('/find-hospitals', methods=['POST'])
def find_hospitals():
    try:
        data = request.json
        lat = data.get('lat')
        lon = data.get('lon')
        location = data.get('location')  # city/pincode string

        if lat and lon:
            # Use provided coordinates
            lat = float(lat)
            lon = float(lon)
        elif location:
            # Geocode the location string to get coordinates
            lat, lon = geocode_location(location)
            if lat is None or lon is None:
                return jsonify({"error": "Could not find coordinates for the provided location"}), 400
        else:
            return jsonify({"error": "Either lat/lon coordinates or location string is required"}), 400

        # Find hospitals near the coordinates using Overpass API
        hospitals = find_nearby_hospitals(lat, lon)

        return jsonify(hospitals)  # Return clean JSON list directly

    except Exception as e:
        print("Error finding hospitals:", e)
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Failed to find hospitals"}), 500


def geocode_location(location):
    """Geocode a location string to latitude and longitude using Nominatim"""
    try:
        url = f"https://nominatim.openstreetmap.org/search?format=json&q={location}&limit=1"
        response = requests.get(url)
        data = response.json()

        if data:
            return float(data[0]['lat']), float(data[0]['lon'])
        return None, None
    except Exception as e:
        print("Geocoding error:", e)
        return None, None


def find_nearby_hospitals(lat, lng, radius=5000):
    """Find hospitals using Overpass API within 5km radius"""
    try:
        # Overpass query for hospitals within 5km radius
        query = f"""
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:{radius},{lat},{lng});
          way["amenity"="hospital"](around:{radius},{lat},{lng});
          node["healthcare"="hospital"](around:{radius},{lat},{lng});
          way["healthcare"="hospital"](around:{radius},{lat},{lng});
        );
        out center meta;
        """

        url = "https://overpass-api.de/api/interpreter"
        response = requests.post(url, data={'data': query})
        data = response.json()

        hospitals = []
        for element in data.get('elements', [])[:10]:  # Limit to 10 results
            if 'tags' in element:
                name = element['tags'].get('name', 'Unnamed Hospital')

                # Get coordinates
                if element['type'] == 'node':
                    h_lat, h_lng = element['lat'], element['lon']
                elif 'center' in element:
                    h_lat, h_lng = element['center']['lat'], element['center']['lon']
                else:
                    continue

                # Extract address from OSM tags
                address_parts = []
                if element['tags'].get('addr:street'):
                    address_parts.append(element['tags']['addr:street'])
                if element['tags'].get('addr:city'):
                    address_parts.append(element['tags']['addr:city'])
                if element['tags'].get('addr:state'):
                    address_parts.append(element['tags']['addr:state'])
                if element['tags'].get('addr:postcode'):
                    address_parts.append(element['tags']['addr:postcode'])

                address = ', '.join(
                    address_parts) if address_parts else 'Address not available'

                hospitals.append({
                    'name': name,
                    'address': address,
                    'latitude': h_lat,
                    'longitude': h_lng
                })

        return hospitals

    except Exception as e:
        print("Overpass API error:", e)
        return []


if __name__ == "__main__":
    # Python runs as a separate service on Port 5001
    app.run(port=5001)

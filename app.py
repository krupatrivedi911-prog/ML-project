"""Compatibility wrapper for the separated Flask backend package."""

import os

from backend.app import *  # noqa: F401,F403

if __name__ == "__main__":
    from backend.app import app as backend_app

    port = int(os.environ.get("PORT", 5000))
    backend_app.run(host="0.0.0.0", port=port, debug=True)

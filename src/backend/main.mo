import Time "mo:core/Time";
import Map "mo:core/Map";

import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Array "mo:core/Array";


actor {
  // Admin principal (default: Percy)
  let admin = Principal.fromText("2vxsx-fae");

  // Contact form submission type
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Map to store contact submissions
  let submissions = Map.empty<Principal, ContactSubmission>();

  // Submit contact form
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };

    submissions.add(caller, submission);
  };

  // Retrieve all entries (admin only)
  public shared ({ caller }) func getAllMessages() : async [ContactSubmission] {
    if (caller == admin) {
      submissions.values().toArray();
    } else {
      [];
    };
  };
};

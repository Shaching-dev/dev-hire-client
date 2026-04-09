import React from "react";
import Container from "../../Container/Container";

const Working = () => {
  const steps = [
    {
      no: "01.",
      title: "Create An Account",
      description:
        "Post A Job To Tell Us About Your Project. We'll Quickly Match You With The Right Freelancers Find Place Best. Nor again is there anyone who loves.",
    },

    {
      no: "02.",
      title: "Search Jobs",
      description:
        "Post A Job To Tell Us About Your Project. We'll Quickly Match You With The Right Freelancers Find Place Best. Nor again is there anyone who loves.",
    },

    {
      no: "03.",
      title: "Save & Apply",
      description:
        "Post A Job To Tell Us About Your Project. We'll Quickly Match You With The Right Freelancers Find Place Best. Nor again is there anyone who loves.",
    },
  ];

  return (
    <Container>
      <div className="px-10 my-5">
        <h3 className="text-2xl md:text-4xl text-center font-bold my-8">
          Steps Our Working Process
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div className="bg-gray-200 px-8 rounded-2xl py-5">
              <h3 className="text-2xl md:text-5xl text-green-700 font-bold mb-3">
                {step.no}
              </h3>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-800 leading-7">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Working;

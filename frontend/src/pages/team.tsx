import { TypographyH2, TypographyH3, TypographyLead } from "@/components/base/Typography";
import { Badge } from "@/components/ui/badge";
import { FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Alex Li",
    image: "https://i.pravatar.cc/150?img=1",
    description: "Alex Li is the CEO and founder of DebateMod. He created the platform to revolutionize debate practice with AI-powered feedback and real-time video debates, helping users enhance their debating skills effectively.",
    linkedin: "https://www.linkedin.com/in/alexli2002"
  },
  {
    name: "Sophie Li",
    image: "https://i.pravatar.cc/150?img=2",
    description: "Sophie Li is the Lead Content Creator and Instructor at DebateMod. She develops educational content to help users improve their debate skills, making learning engaging and effective.",
    linkedin: "https://www.linkedin.com/in/sophie-li"
  },
  {
    name: "Jason Tang",
    image: "https://i.pravatar.cc/150?img=3",
    description: "Jason Tang is a Software Developer at DebateMod. With extensive experience in full-stack development, he ensures a seamless user experience and robust platform performance.",
    linkedin: "https://www.linkedin.com/in/jasontang03"
  }
];

export default function TeamPage() {
  return (
    <div className="mt-12">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-3">
          About Our Team
        </Badge>
        <TypographyH2 className="mb-3 border-none text-2xl md:text-3xl lg:text-4xl">
          Meet the Team
        </TypographyH2>
        <TypographyLead className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl">
          Our dedicated team is here to help you excel in debate practice.
        </TypographyLead>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 p-4 border-2 border-gray-200 dark:border-gray-700 shadow-md h-full rounded-lg">
              <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <div className="flex items-center mb-2">
                <TypographyH3 className="text-xl md:text-2xl">
                  {member.name}
                </TypographyH3>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-400 hover:text-gray-200 transition-colors duration-200">
                  <FaLinkedin size={24} />
                </a>
              </div>
              <TypographyLead className="text-sm md:text-base text-gray-300">
                {member.description}
              </TypographyLead>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
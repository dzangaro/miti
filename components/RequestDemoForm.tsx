
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const RequestDemoForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send form data to email
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'c5a2f6e0-53c2-4c58-a8f9-65723c68acf5', // Web3Forms public access key
          from_name: 'Miti Demo Request',
          subject: `Demo Request from ${formData.name}`,
          to: 'dominick@mitirisk.io',
          reply_to: formData.email,
          message: `
            Name: ${formData.name}
            Email: ${formData.email}
            Company: ${formData.company}
            Job Title: ${formData.jobTitle}
            
            Additional Information:
            ${formData.message}
          `
        }),
      });
      
      if (response.status === 200) {
        toast({
          title: "Demo Request Submitted",
          description: "Our team will contact you shortly to schedule your personalized demo.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          jobTitle: '',
          message: ''
        });
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-[#221F26]">Request Your Personalized Demo</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Smith"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Work Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@company.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Company Inc."
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Risk Manager"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your specific needs or challenges"
            rows={4}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-[#221F26] hover:bg-[#221F26]/90 text-white font-semibold py-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Request Demo'}
        </Button>
        <p className="text-xs text-[#221F26]/70 text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  );
};

export default RequestDemoForm;
